import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { message, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import produce from 'immer';
import { RootState } from '@/redux/store';
import api, { Book, BookPocket, User } from '@/api';
import Back from '@/components/Back';
import Loading from '@/components/Loading';
import SettlementBar from '@/components/SettlementBar';
import PocketItem, { CheckValue } from '@/components/PocketItem';
import NoData from '@/components/NoData';

const { confirm } = Modal;

const Container = styled.div`
  max-width: 960px;
  margin: 10px auto 0px;
  @media (max-width: 740px) {
    margin-top: 70px;
  }
`;

const Main = styled.main`
  padding-bottom: 100px;
  .checkbox {
    vertical-align: top;
    margin-right: 20px;
  }
  .button {
    font-size: 12px;
  }
`;

const PocketList = styled.ul``;

const Pocket = () => {
  const user = useSelector<RootState, User>((state) => state.user);
  const [bookPocket, setBookPocket] = useState<BookPocket>();
  const [checkedList, setCheckedList] = useState<boolean[]>();
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);

  useEffect(() => {
    api.getBookPocket(user._id).then((data) => {
      setBookPocket(data);
      if (data) {
        setCheckedList(new Array(data.length).fill(false));
      }
    });
  }, [user]);

  const handleCheckBoxChange = (value: CheckValue) => {
    const { index, checked } = value;
    if (checkedList) {
      setCheckedList(
        produce(checkedList, (draftCheckList) => {
          draftCheckList[index] = checked;
        }),
      );
    }
  };

  const setAllCheckedStatus = (status: boolean) => {
    if (checkedList) {
      setCheckedList(
        produce(checkedList, (draftCheckList) => {
          draftCheckList.forEach((item, index) => {
            draftCheckList[index] = status;
          });
        }),
      );
    }
  };

  const togleAllChecked = () => {
    setAllCheckedStatus(!isAllChecked);
    setIsAllChecked(!isAllChecked);
  };

  const deletePocketItem = async (bookId: string, amount: number) => {
    await api.deleteBookFromPocket(user._id, bookId, amount);
    setBookPocket(
      produce(bookPocket, (draftBookPocket) => {
        const index = draftBookPocket?.findIndex((item) => item.book._id === bookId);
        index !== undefined && draftBookPocket?.splice(index, 1);
      }),
    );
  };

  const handlePocketItemDeleteConfirm = async (bookId: string, amount: number) => {
    try {
      await deletePocketItem(bookId, amount);
      message.success('删除成功！');
    } catch (error) {
      message.error('删除失败！');
    }
  };

  const handlePocketItemAmountAdd = async (book: Book, amount: number) => {
    await api.addBookToPocket(user._id, book, amount);
    setBookPocket(
      produce(bookPocket, (draftBookPocket) => {
        const index = draftBookPocket?.findIndex((item) => item.book._id === book._id);
        if (index !== undefined && index !== -1) {
          draftBookPocket![index].amount += amount;
        }
      }),
    );
  };

  const handlePocketItemAmountDelete = async (bookId: string, amount: number) => {
    await api.deleteBookFromPocket(user._id, bookId, amount);
    setBookPocket(
      produce(bookPocket, (draftBookPocket) => {
        const index = draftBookPocket?.findIndex((item) => item.book._id === bookId);
        if (index !== undefined && index !== -1) {
          draftBookPocket![index].amount -= amount;
        }
      }),
    );
  };

  const getCheckedItemsLength = () => {
    return checkedList!.filter((checked) => checked).length;
  };

  const getTotalMoney = () => {
    let total = 0;
    bookPocket!.forEach((item, index) => {
      if (checkedList![index]) {
        if (item.book.discountPrice) {
          total += item.amount * item.book.discountPrice;
        } else {
          total += item.amount * item.book.price;
        }
      }
    });
    return total;
  };

  const handleDeleteCheckedItems = () => {
    confirm({
      title: '确定删除这些图书吗?',
      icon: <ExclamationCircleOutlined />,
      async onOk() {
        try {
          for (let i = 0; i < bookPocket!.length; i++) {
            if (checkedList![i]) {
              const item = bookPocket![i];
              await api.deleteBookFromPocket(user._id, item.book._id, item.amount);
            }
          }
          setBookPocket(
            bookPocket?.filter((item, index) => {
              return !checkedList![index];
            }),
          );
          setCheckedList(checkedList?.filter((item) => !item));
          message.success('删除成功！');
        } catch {
          message.error('删除失败！');
        }
      },
    });
  };

  const handleBuy = () => {
    if (!user.address || !user.phone) {
      message.error('需要先将手机号和地址填写完整！');
      return;
    }
    confirm({
      title: '确定购买吗?',
      icon: <ExclamationCircleOutlined />,
      async onOk() {
        try {
          message.success('支付成功！');
        } catch {
          message.error('支付失败！');
        }
      },
    });
  };

  if (!bookPocket || !checkedList) return <Loading />;

  return (
    <Container>
      <Back />
      <Main>
        <PocketList>
          {bookPocket.map((item, index) => (
            <PocketItem
              key={item.book._id}
              value={item}
              index={index}
              checked={checkedList[index]}
              onCheckBoxChange={handleCheckBoxChange}
              onItemDeleteConfirm={handlePocketItemDeleteConfirm}
              onItemAmountAdd={handlePocketItemAmountAdd}
              onItemAmountDelete={handlePocketItemAmountDelete}
            />
          ))}
        </PocketList>
      </Main>
      {bookPocket.length ? (
        <SettlementBar
          isAllChecked={isAllChecked}
          hasItemchecked={Boolean(checkedList.find((checked) => checked))}
          checkedItemsLength={getCheckedItemsLength()}
          totalMoney={getTotalMoney()}
          onDeleteCheckedItems={handleDeleteCheckedItems}
          onTogleAllChecked={togleAllChecked}
          onBuy={handleBuy}
        />
      ) : (
        <NoData />
      )}
    </Container>
  );
};

export default Pocket;
