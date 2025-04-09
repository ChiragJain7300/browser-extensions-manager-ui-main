import React from "react";

const ExtTab = ({ ext, handleCheckboxChange, removeItem }) => {
  return (
    <div
      key={ext.id}
      className="flex flex-col bg-white dark:bg-Neutral-800 p-5 rounded-xl mb-5"
    >
      <div className="flex items-start gap-3 mb-10">
        <img src={ext.logo} alt={ext.logo} />
        <div>
          <h2 className="text-xl font-bold mb-1">{ext.name}</h2>
          <p className="dark:text-Neutral-300">{ext.description}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="px-5 py-2 rounded-full border dark:border-Neutral-600 cursor-pointer peer-focus:ring-4 dark:peer-focus:ring-Red-500 duration-150 font-bold dark:hover:bg-Red-500 dark:hover:text-Neutral-900"
          onClick={() => removeItem(ext.id)}
        >
          Remove
        </button>

        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={ext.isActive}
            onChange={() => handleCheckboxChange(ext.id)}
            className="sr-only peer"
          />
          <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-Red-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-Red-500 peer-checked:bg-Red-400 dark:peer-checked:bg-Red-400"></div>
        </label>
      </div>
    </div>
  );
};

export default ExtTab;
