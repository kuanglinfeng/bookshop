import React from 'react';
import styled from 'styled-components';
import { message, Modal, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons/lib';
import axios from '@/tools/axios';
import { baseURL, uploadImageKey, uploadImageURL } from '@/config';

const Contaienr = styled.div`
  .ant-upload-list-item-info,
  .ant-upload-select-picture-card {
    border-radius: 50% !important;
    overflow: hidden !important;
    border: 1px solid #d9d9d9;
  }
  .ant-upload-list-item-list-type-picture-card {
    border: none !important;
  }
`;

interface Props {
  value: string;
  onChange: (value: string) => void;
}

interface State {
  isModalSeen: boolean;
}

class ImageUploader extends React.Component<Props, State> {
  state = {
    isModalSeen: false,
  };

  getUploadContent = () => {
    if (this.props.value) return null;
    return (
      <div>
        <PlusOutlined />
        <div>点击上传</div>
      </div>
    );
  };

  getFileList = () => {
    const fileName = this.props.value;
    const fullPath = `${baseURL}/upload/${fileName}`;
    if (fileName) {
      return [
        {
          uid: fullPath,
          name: fullPath,
          url: fullPath,
        },
      ];
    }
    return [];
  };

  handleUploadRequest = async (p: any) => {
    let formData = new FormData();
    formData.append(p.filename, p.file);
    const request = new Request(p.action, {
      method: 'post',
      body: formData,
    });
    const response = await fetch(request).then((response) => response.json());
    if (response.error) {
      message.error('上传失败！');
    } else {
      if (this.props.onChange) {
        this.props.onChange(response.data);
      }
    }
  };

  handleImageDelete = async () => {
    const { value, onChange } = this.props;
    try {
      await axios.delete(`/api/upload/${value}`);
      onChange && onChange('');
      message.success('删除成功！');
    } catch (error) {
      message.error('网络错误，删除失败！');
    }
  };

  render() {
    const { value: fileName } = this.props;
    const { isModalSeen } = this.state;

    return (
      <Contaienr>
        <Upload
          action={baseURL + uploadImageURL}
          name={uploadImageKey}
          accept=".jpg, .png, .jpeg, .gif"
          listType="picture-card"
          // @ts-ignore
          fileList={this.getFileList()}
          customRequest={this.handleUploadRequest}
          onRemove={this.handleImageDelete}
          onPreview={() => {
            this.setState({ isModalSeen: true });
          }}
        >
          {this.getUploadContent()}
        </Upload>
        <Modal visible={isModalSeen} footer={null} onCancel={() => this.setState({ isModalSeen: false })}>
          <img alt="example" style={{ width: '100%' }} src={`${baseURL}/upload/${fileName}`} />
        </Modal>
      </Contaienr>
    );
  }
}

export default ImageUploader;
