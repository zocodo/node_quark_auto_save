const saveFiles = require("./script/saveFiles.js");
const getPdir = require("./script/getPdir.js");
const getUpdatelist = require("./script/getUpdatelist.js");
const main = async () => {
  const list = await getUpdatelist();
  for (let index = 0; index < list.length; index++) {
    const item = list[index];
    if (item.save_as_status == 0) {
      console.log(`===========开始更新订阅============`);
    
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
    }
  }
};

main();
