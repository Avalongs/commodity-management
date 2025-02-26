export function generateOrderId(): string {
  const timestamp = Date.now().toString(); // 获取当前时间戳
  const random = Math.floor(Math.random() * 100000)
    .toString()
    .padStart(15, '0'); // 生成一个5位的随机数
  return `${timestamp}${random}`;
}
