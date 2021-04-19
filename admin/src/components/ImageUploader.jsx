import React from 'react';
import { message, Modal, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons/lib';
import PropTypes from 'prop-types';
import axios from 'tools/axios';
import config from '../config';

const { baseURL, uploadImageURL, uploadImageKey } = config;

class ImageUploader extends React.Component {
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
  }

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
  }

  handleUploadRequest = async (p) => {
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
  }

  handleImageDelete = async () => {
    const { value, onChange } = this.props;
    try {
      await axios.delete(`/api/admin/upload/${value}`);
      onChange && onChange('');
      message.success('删除成功！');
    } catch (error) {
      message.error('网络错误，删除失败！');
    }
  }

  render() {

    const { value: fileName } = this.props;
    const { isModalSeen } = this.state;

    return (
      <div>
        <Upload
          action={baseURL + uploadImageURL}
          name={uploadImageKey}
          accept=".jpg, .png, .gif"
          listType="picture-card"
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
      </div>
    );
  }
}

ImageUploader.propTypes = {
  // value是文件名
  value: PropTypes.string,
  onChange: PropTypes.func,
}

export default ImageUploader;
