import "@style/components/Login.scss";

const Tip = (params: { text: string }) => {
  return <div className="Tip">{params.text}</div>;
};

export { Tip };
