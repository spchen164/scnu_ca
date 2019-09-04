# scnu_ca
华南师大计算机协会小程序

## 开发环境
微信开发者工具+Bmob云

## 下一步要做的
完善各个功能页面

### 为“我”里面的选项添加页面
* 报修
* 进行中的订单-finished
* 已完成的订单-finished
* 会员缴费（可选）
* 关于
* 意见反馈
* 管理员管理-finished
* 技术人员管理-finished
* 会员管理-finished

### 完善首页

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

## 开发时注意
* 登录功能已经完善，所以在添加其它页面时，可以直接从globalData里获取对应数据
* 为了便于管理员修改数据库，有些地方需要添加管理员才可以显示的按钮
* 若想到有什么可以添加的功能或者好的想法，最好先跟我商量一下