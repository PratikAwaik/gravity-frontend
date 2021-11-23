import { Tab } from "@headlessui/react";
import PropTypes from "prop-types";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Tabs = ({ categories, children }) => {
  return (
    <div className="w-full pb-8 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 rounded-xl items-center sm:justify-center overflow-x-auto">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-max px-2.5 py-2 text-sm uppercase leading-5 font-medium rounded-lg mx-3",
                  "ring-offset-2 ring-white ring-opacity-60",
                  selected
                    ? "bg-theme-white shadow border-2"
                    : "hover:bg-white/[0.12]"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">{children}</Tab.Panels>
      </Tab.Group>
    </div>
  );
};

Tabs.propTypes = {
  categories: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default Tabs;
