'use strict';
const db=uniCloud.database();
exports.main = async (event, context) => {
	let {detail,picurls}=event;
	db.collection("totalPosition").add({
    //返回一个对象，然后...返回展开的数据
    posttime:Date.now(),
    ...detail,
    picurls
  })
	//返回数据给客户端
};
