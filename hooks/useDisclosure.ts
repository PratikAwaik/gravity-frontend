import * as React from "react";

// useDisclosure is a custom hook used to help handle common open, close, or toggle scenarios.
// It can be used to control feedback component such as Modal, Drawer, etc.

export const useDisclosure = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return { isOpen, onOpen, onClose };
};
