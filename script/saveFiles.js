const axios = require("axios");
const config = require("../config.json") 
module.exports = async (data) => {
  return await axios({
    url: "https://drive-pc.quark.cn/1/clouddrive/share/sharepage/save",
    method: "POST",
    params: {
      entry: "update_share",
      pr: "ucpro",
      fr: "pc",
      uc_param_str: "",
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
    data: {
      pwd_id: data.pwd_id,
      scene: "link",
      stoken: data.stoken,
      // fid_list: ["306f5579e9a946a4a4141993e03ef2b5"],
      // fid_token_list: ["494c9f03d5e099dd2ac7e93bf2488a8a"],
      mode: "inc",
      pdir_fid: "",
      save_all: false,
      to_pdir_fid: data.to_pdir_fid,
    },
  }).then((res) => {
    console.log(11111, res.data.data);
  });
};
