
import React from 'react';

const Loader = () => (
    <div className="flex-center w-full">
      <img
        src={"/assets/images/loader.svg"}
        alt="loader"
        width={24}
        height={24}
        className="animate-spin"
      />
    </div>
  );
  
  export default Loader;