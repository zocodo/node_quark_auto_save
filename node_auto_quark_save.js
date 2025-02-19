/*
  new Env('夸克自动追更');
  cron: 0 0/5 * * * ?
*/

const axios = require("axios");
const cookie = process.env.QUARK_PAN_COOKIE;
if (!cookie) {
  console.log(`===========没有设置夸克网盘cookie============`);
  console.log(`===========设置步骤============`);
  console.log(`青龙面板-环境变量, 点击创建变量`);
  console.log(`名称输入: QUARK_PAN_COOKIE `);
  console.log(`值输入: 夸克云盘网页版的cookie,不懂如何获取请百度`);
  return;
}

const main = async () => {
  console.log(`===========获取需要更新的订阅============`);
  const list = await getUpdatelist();

  for (let index = 0; index < list.length; index++) {
    const item = list[index];
    if (item.save_as_status == 0) {
      console.log(`⏳===========开始更新订阅============`);

      const dirdata = await getPdir({
        target_fid: item.first_fid,
        pwd_id: item.pwd_id,
      });
      let fullpath = "/";

      dirdata.dir.full_path.forEach((path) => {
        fullpath += path.file_name + "/";
      });
      console.log(`订阅资源: ${item.title}`);
      console.log(`保存路径: ${fullpath}`);
      const task = saveFiles({
        pwd_id: item.pwd_id,
        stoken: item.stoken,
        to_pdir_fid: dirdata.pdir_fid,
      });
      console.log(`===========订阅更新完成============`);
    } else {
      console.log(`订阅资源: ${item.title} 无需更新`);
    }
  }
};

main();

async function getPdir(data) {
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
      cookie: cookie,
      Referer: "https://pan.quark.cn/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    data: {},
  }).then((res) => {
    return res.data.data;
  });
}

async function getUpdatelist() {
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
      cookie: cookie,
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
    if (res.status == 200) {
      return res.data.data.list;
    }
  });
}

async function saveFiles(data) {
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
      cookie: cookie,
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
}
