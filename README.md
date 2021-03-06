# scnu_ca
华南师大计算机协会小程序

## 开发环境
微信开发者工具+Bmob云

## 下一步要做的

### 后续可新增功能
* 美化UI
* 对意见反馈进行处理后能够返回给反馈用户处理结果
* 对于提交之后的报单可以添加额外的描述或重新编辑
* 对于已完成的报单的评价可以弄成像微博那样具有交互性质
* 用户提交表单之后的提醒功能

### 为“我”里面的选项添加页面
* 报修-finished
* 进行中的订单-finished
* 已完成的订单-finished
* 会员缴费（可选）
* 关于-剩下管理员修改权限(可选)
* 意见反馈-finished
* 管理员管理-finished
* 技术人员管理-finished
* 会员管理-finished
* 活动管理-finished

### 添加会员缴费功能（可选）
若要实现，则需要添加一个表来记录缴费情况，否则可能会漏缴费（填表+缴费）

## 数据库
每一个表都有下列Bmob自带的属性
```
objectId —— string
createdAt —— date
updatedAt —— date
```

### user表
```
userOpenid —— string primaryKey
userInfo —— object
isAdmin —— boolean
isTech —— boolean
isVIP —— boolean
```

### repair表
```
objectId —— string primaryKey
userOpenid —— string
status —— number
problem —— object
suggestion —— string
```

### feedback表
```
objectId —— string primaryKey
content —— string
```

### activity表
```
objectId —— string primaryKey
title —— string
content —— string
```

## 开发时注意
* 登录功能已经完善，所以在添加其它页面时，可以直接从globalData里获取对应数据
* 为了便于管理员修改数据库，有些地方需要添加管理员才可以显示的按钮
* 若想到有什么可以添加的功能或者好的想法，最好先跟我商量一下