import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, message } from 'antd';
import { Dispatch, RootState } from '@/redux/store';
import api, { User } from '@/api';
import Back from '@/components/Back';
import Footer from '@/components/Footer';
import ImageUploader from '@/components/ImageUploader';

const Container = styled.div`
  max-width: 960px;
  margin: 10px auto 0px;
  .avatar {
    border-radius: 50%;
    overflow: hidden;
  }
`;

const Content = styled.main`
  border-radius: 4px;
  background-color: #fff;
  min-height: 560px;
  padding: 30px;

  @media (max-width: 740px) {
    margin-top: 70px;
  }
  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

const Title = styled.div`
  font-weight: bold;
  padding: 5px 0;
  font-size: 20px;
`;

const Field = styled.div`
  padding: 10px;
  .input {
    width: 520px;
  }
`;

const Label = styled.span`
  display: inline-block;
  width: 4em;
  text-align: right;
  margin-right: 1em;
`;

const AvatarWrapper = styled.div`
  height: 120px;
  display: flex;
  justify-content: center;
`;

const Main = styled.main``;

const Actions = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: start;
  .cancel {
    margin-left: 20px;
  }
`;

const Profile = () => {
  const user = useSelector<RootState, User>((state) => state.user);
  const dispatch = useDispatch<Dispatch>();

  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    init(user);
  }, [user]);

  const init = (user: User) => {
    setPhone(user.phone);
    setName(user.name);
    setAddress(user.address);
  };

  const handleAvatarChange = async (url: string) => {
    try {
      await api.editUser(user._id, { ...user, avatar: url });
      dispatch.user.set({ ...user, avatar: url });
    } catch (error) {}
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.trim());
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value.trim());
  };

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value.trim());
  };

  const handleSubmit = async () => {
    try {
      await api.editUser(user._id, { ...user, name, phone, address });
      dispatch.user.set({ ...user, name, phone, address });
      message.success('修改成功！');
    } catch (error) {}
    setIsEdit(false);
  };

  const handleCancel = async () => {
    init(user);
    setIsEdit(false);
  };

  return (
    <Container>
      <Back />
      <Content>
        <Title>我的信息</Title>
        <AvatarWrapper>
          <ImageUploader value={user.avatar} onChange={handleAvatarChange} />
        </AvatarWrapper>
        <Main>
          <Actions>
            {isEdit ? (
              <>
                <Button className="cancel" onClick={handleCancel}>
                  取消
                </Button>
                <Button type="primary" onClick={handleSubmit}>
                  完成
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEdit(true)}>修改信息</Button>
            )}
          </Actions>
          <Field>
            <Label>账号：</Label>
            <span>{user.email}</span>
          </Field>
          <Field>
            <Label>昵称：</Label>
            {isEdit ? <Input value={name} onChange={handleNameChange} className="input" /> : <span>{name}</span>}
          </Field>

          <Field>
            <Label>地址：</Label>
            {isEdit ? (
              <Input value={address} onChange={handleAddressChange} className="input" />
            ) : (
              <span>{address}</span>
            )}
          </Field>
          <Field>
            <Label>手机号：</Label>
            {isEdit ? <Input value={phone} onChange={handlePhoneChange} className="input" /> : <span>{phone}</span>}
          </Field>
        </Main>

        <Footer className="footer" />
      </Content>
    </Container>
  );
};

export default Profile;
