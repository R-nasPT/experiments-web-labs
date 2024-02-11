import useToggle from "../hooks/useToggle";
import PopupComfirm from "../components/popup-confirm";

export default function Mock() {
  const [toggle, setToggle] = useToggle(false);
  return (
    <>
      <div>
        <button>click toggle</button>
      </div>
      {toggle && <PopupComfirm handleClose={() => setToggle()} />}
    </>
  );
}
