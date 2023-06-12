export default function ContentWrapper(props) {
  return (
    <div
      style={{
        padding: "0px 0px 0px 0px", // MB: Carousel'de padding verdiği ve sayfaya sıfırlamadığı için buradaki paddingleri sıfırladım
        minHeight: "calc(100vh - 118px)",
      }}
    >
      {props.children}
    </div>
  );
}
