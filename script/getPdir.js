const axios = require("axios");
const config = require("../config.json") 

module.exports = async (data) => {
  return await axios({
    url: "https://drive-pc.quark.cn/1/clouddrive/share/sharepage/dir",
    method: "GET",
    params: {
      pr: "ucpro",
      fr: "pc",
      aver: 1,
      scene: "",
      uc_param_str: "",
      target_fid: data.target_fid,
      pwd_id: data.pwd_id,
    },
    headers: {
      accept: "application/json, text/plain, */*",
      "accept-language": "zh-CN,zh;q=0.9",
      "content-type": "application/json;charset=UTF-8",
      "sec-ch-ua":
        '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      cookie: config.cookie,
      Referer: "https://pan.quark.cn/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    data: {},
  }).then((res) => {
    return res.data.data;
  });
};
