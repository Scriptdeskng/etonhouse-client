import { motion, Transition } from "framer-motion";

interface Props {
  initial?: number;
  duration?: number;
  children: React.ReactNode;
  className?: string;
  transition?: Transition;
}

const EnterFromY = ({
  initial = -30,
  duration = 0.8,
  children,
  className,
  transition,
}: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: initial }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: initial }}
      transition={{ duration: duration, ...transition }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default EnterFromY;
