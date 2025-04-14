import { motion, Transition } from "framer-motion";

interface Props {
  initial?: number;
  duration?: number;
  children: React.ReactNode;
  className?: string;
  transition?: Transition;
}

const EnterFromX = ({
  initial = -100,
  duration = 0.8,
  children,
  className,
  transition,
}: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: initial || -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: duration || 0.5, ...transition }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default EnterFromX;
