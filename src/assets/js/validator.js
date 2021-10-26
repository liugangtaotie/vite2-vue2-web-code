/*
    电话+手机(必填)
*/
export const phoneTel = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请填入联系号码！"));
  }
  setTimeout(() => {
    if (!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value)) {
      callback(new Error("请正确填写联系号码！"));
    } else {
      callback();
    }
  }, 1000);
};

/*
    电话+手机(选填)
*/
export const phoneTel_Not = (rule, value, callback) => {
  if (value) {
    setTimeout(() => {
      if (!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value)) {
        callback(new Error("请正确填写电话/手机号码！"));
      } else {
        callback();
      }
    }, 1000);
  }
};

/*
    Phone(必填)
*/
export const phone = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请填入手机号码！"));
  }
  setTimeout(() => {
    if (!/^1[3456789]\d{9}$/.test(value)) {
      callback(new Error("请正确填写手机号码！"));
    } else {
      callback();
    }
  }, 1000);
};

/*
    Email(选填)
*/
export const email = (rule, value, callback) => {
  if (!value) {
    return callback();
  }
  setTimeout(() => {
    if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)) {
      callback(new Error("请正确填写邮箱！"));
    } else {
      callback();
    }
  }, 1000);
};

/*
    网址(选填)
*/
export const url = (rule, value, callback) => {
  if (!value) {
    return callback();
  }
  setTimeout(() => {
    if (
      !/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/.test(
        value
      )
    ) {
      callback(new Error("请正确填写网址！"));
    } else {
      callback();
    }
  }, 1000);
};

/*
    网址(必填)
*/
export const url_ = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请填写该项！"));
  }
  let match = /(http|https):\/\/([\w.]+\/?)\S*/;
  ///^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/
  setTimeout(() => {
    if (!match.test(value)) {
      callback(new Error("请正确填写网址！"));
    } else {
      callback();
    }
  }, 1000);
};

/*
    数字(必填)
*/
export const onlynum = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("该项必填！"));
  }
  setTimeout(() => {
    if (!/^\d+$/gi.test(value)) {
      callback(new Error("只能由数字组成！"));
    } else {
      callback();
    }
  }, 1000);
};

/*
    数字字母下划线(必填)
*/
export const numbers = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("该项必填！"));
  }
  setTimeout(() => {
    if (!/^\w+$/gi.test(value)) {
      callback(new Error("只能由数字字母下划线组成！"));
    } else {
      callback();
    }
  }, 1000);
};
/*
    小数(1位)+不能为0
*/
export const numPointOne = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("该项必填！"));
  }
  setTimeout(() => {
    if (!/^([1-9]\d*|0)(\.\d{1,1})?$/gi.test(value)) {
      callback(new Error("只能由数字组成且最多1位小数！"));
    } else {
      callback();
    }
  }, 1000);
};

/*
    小数(2位)+不能为0
*/
export const numPoint = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("该项必填！"));
  }
  setTimeout(() => {
    if (!/^([1-9]\d*|0)(\.\d{1,2})?$/gi.test(value)) {
      callback(new Error("只能由数字组成且最多2位小数！"));
    } else {
      callback();
    }
  }, 1000);
};

/*
    小数+不能为0
*/
export const doubleNumPoint = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("该项必填！"));
  }
  setTimeout(() => {
    if (!/^([1-9]\d*|0)(\.\d{1,10})?$/gi.test(value)) {
      callback(new Error("数据格式不正确！"));
    } else {
      callback();
    }
  }, 1000);
};

/*
    小数(2位)+允许为0
*/
export const numPoint_Zero = (rule, value, callback) => {
  if (value === "") {
    return callback(new Error("可以填写0但不允许为空！"));
  }
  setTimeout(() => {
    if (!/^([1-9]\d*|0)(\.\d{1,2})?$/gi.test(value)) {
      callback(new Error("只能由数字组成且最多2位小数！"));
    } else {
      callback();
    }
  }, 1000);
};

/*
    ip(必填)
*/
export const ipv46 = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("该项必填！"));
  }
  setTimeout(() => {
    if (
      !/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/gi.test(
        value
      )
    ) {
      callback(new Error("请填入正确的ip地址(ipv4/ipv6)！"));
    } else {
      callback();
    }
  }, 1000);
};

/*
    中文(必填)
*/
export const text = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("该项必填！"));
  }
  setTimeout(() => {
    //   /^[\u4e00-\u9fa5]{2,10}$/
    if (!/^[\u4e00-\u9fa5\u3001\A-\Z\d]+$/g.test(value)) {
      callback(new Error("只能输入中文汉字！"));
    } else {
      callback();
    }
  }, 1000);
};

/*
    身份证号码(必填)
*/
export const idCard = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("该项必填！"));
  }
  setTimeout(() => {
    if (
      !/^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/g.test(
        value
      )
    ) {
      callback(new Error("请输入正确的身份证号码！"));
    } else {
      callback();
    }
  }, 1000);
};
//该项必填
export const notNull = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("该项必填！"));
  } else {
    callback();
  }
};

/*
    小数(2位)+8位限制
*/
export const numPoint_8 = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("该项必填！"));
  }
  setTimeout(() => {
    if (!/^([1-9]\d*|0)(\.\d{1,2})?$/gi.test(value)) {
      callback(new Error("只能由数字组成且最多2位小数！"));
    } else {
      if ((value + "").length > 8) {
        callback(new Error("长度不能超过8位！"));
      }
      callback();
    }
  }, 1000);
};
//密码设置
export const passwordSet = (rule, value, callback) => {
  if (value) {
    setTimeout(() => {
      if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(value)) {
        callback(
          new Error(
            "必须包含大小写字母和数字的组合，可以使用特殊字符，长度在8-20之间！"
          )
        );
      } else {
        callback();
      }
    }, 1000);
  } else {
    callback();
  }
};
