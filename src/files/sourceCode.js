console.log("filename line:1, column:0", 1);
function func() {
  console.info("filename line:3, column:2", 2);
}
export default class Clazz {
  say() {
    console.debug(3);
  }
  render() {
    return <div>{console.error("filename line:10, column:17", 4)}</div>;
  }
}