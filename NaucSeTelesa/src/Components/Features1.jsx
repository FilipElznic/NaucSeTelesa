import "../App.css";

function Features1(props) {
  return (
    <div className="features1 rounded-3xl h-56 w-56 xl:h-64 xl:w-64 shadow-lg flex flex-col justify-between p-5 border-2 border-transparent hover:border-purple-500 transition-all ">
      <div className="flex h-full w-full">
        <div className="text-3xl relative drop-shadow-white-glow">
          {props.icon}
        </div>
      </div>

      <div>
        <h3 className="text-xl">{props.name}</h3>
        <p>{props.text}</p>
      </div>
    </div>
  );
}

export default Features1;
