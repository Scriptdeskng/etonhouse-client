import { AnimatePresence, motion } from "framer-motion";

interface Props {
  open: boolean;
  children: React.ReactNode;
}

const Modal = ({ open, children }: Props) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full h-screen fixed top-0 left-0 bg-black/50 flex items-center justify-center px-5 xl:px-30"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
