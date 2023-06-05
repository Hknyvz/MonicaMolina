export default function ContentWrapper(props) {
  return (
    <div
      style={{
        padding: "0px 10px 10px 10px",
        minHeight: "calc(100vh - 118px)",
      }}
    >
      {props.children}
    </div>
  );
}
