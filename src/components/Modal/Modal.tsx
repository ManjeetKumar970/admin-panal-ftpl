import { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: number;
  height?: number;
  title?: string;
  footer?: ReactNode;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 50 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.9, y: 50 }
};

const Modal = ({
  isOpen,
  onClose,
  children,
  width = 500,
  height = 400,
  title,
  footer
}: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content */}
          <motion.div
            className="relative z-10 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{
              width: '90%',
              maxWidth: `${width}px`,
              height: `${height}px`
            }}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl transition"
              onClick={onClose}
              aria-label="Close modal"
            >
              &times;
            </button>

            {/* Title */}
            {title && (
              <div className="px-6 pt-6 pb-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">{title}</h2>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 px-6 py-4 overflow-y-auto text-gray-700 custom-scroll">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                {footer}
              </div>
            )}
          </motion.div>

          <style jsx>{`
            .custom-scroll::-webkit-scrollbar {
              width: 6px;
            }

            .custom-scroll::-webkit-scrollbar-thumb {
              background-color: #ccc;
              border-radius: 9999px;
            }

            .custom-scroll::-webkit-scrollbar-track {
              background: transparent;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
