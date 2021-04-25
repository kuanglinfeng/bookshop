import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Button, Card, Input, message, Spin } from 'antd'
import { KeyOutlined, UserOutlined } from '@ant-design/icons'
import api from 'api'

const Container = styled.div`
  margin: 200px auto 0;
`;

const Login = () => {

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()

  const checkLogin = async () => {
    setIsLoading(true)
    if (!name) {
      message.error('用户名不能为空！')
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return false
    } else if (!password) {
      message.error('密码不能为空！')
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return false
    }
    const result = await api.login({name, password})
    const token = result.data
    if (token) {
      window.localStorage.setItem('token', token)
      history.push('/')
    } else {
      message.error('用户名密码错误！')
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    }
  }

  const onKeyDown = async (e) => {
    if (e.key === 'Enter') {
      await checkLogin()
    }
  }

  return (
    <Container>
      <Spin
        tip="Loading..."
        spinning={isLoading}
      >
        <Card
          title='小熊书店后台管理系统'
          bordered={true}
          style={{width: 400, textAlign: 'center'}}
        >
          <Input
            id='username'
            size='large'
            placeholder='输入用户名'
            prefix={<UserOutlined />}
            onChange={e => {
              setName(e.target.value)
            }}
          />
          <br/><br/>
          <Input.Password
            id='password'
            size='large'
            placeholder='输入密码'
            prefix={<KeyOutlined />}
            onChange={e => {
              setPassword(e.target.value)
            }}
            onKeyDown={onKeyDown}
          />
          <br/><br/>
          <Button
            type='primary'
            size='large'
            block
            onClick={checkLogin}
          >
          登录
          </Button>
        </Card>
      </Spin>
    </Container>
  )
}

export default Login;
