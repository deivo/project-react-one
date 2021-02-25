const flag = 'null';
console.log(typeof JSON.parse(flag));
if (flag) {
  console.log('成功')
} else {
  console.log('失败')
}