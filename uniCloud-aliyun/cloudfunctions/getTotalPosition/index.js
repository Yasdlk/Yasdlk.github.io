'use strict';
const db = uniCloud.database();
// 获取 `user` 集合的引用
exports.main = async (event, context) => {
  let {skip=0}=event;
	return  await db.collection("totalPosition").limit(10).skip(skip).get();
};
