const axios = require("axios");
const config = require("./config.json") 

module.exports = async () => {
  return await axios({
    url: "https://drive-pc.quark.cn/1/clouddrive/share/update_list",
    method: "post",
    params: {
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
      share_read_statues: [0, 1],
      fetch_max_file_update_pos: 1,
      fetch_update_files: 1,
      read_update_list: 1,
      page: 1,
      page_size: 100,
      fetch_total: 1,
    },
  }).then((res) => {
    if(res.status==200){
      return res.data.data.list
    }
  });
}
