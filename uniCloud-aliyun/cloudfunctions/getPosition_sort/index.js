'use strict';
const db=uniCloud.database()
exports.main = async (event, context) => {
  let {sort}=event
  let {skip=0}=event
	return await db.collection("totalPosition").limit(9).skip(skip).where({
    sort
  }).get();
};
