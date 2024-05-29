const LoadingComponent = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-background/50">
      <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-amber-500 font-bold">
        Loading...
      </p>
    </div>
  );
};

export default LoadingComponent;
