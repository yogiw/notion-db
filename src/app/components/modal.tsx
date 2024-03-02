type ModalProps = { children: React.ReactElement; onClose: () => void };

export const Modal = ({ children, onClose }: ModalProps) => {
  return (
    <div className="flex justify-center items-center fixed top-0 left-0 bottom-0 right-0">
      <div
        className="fixed top-0 left-0 right-0 bottom-0 bg-black/50"
        onClick={onClose}
      />
      <div className="bg-white rounded border border-slate-100 p-4 z-10 relative">
        <button className="absolute right-2 top-2" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};
