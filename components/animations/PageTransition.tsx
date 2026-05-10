const PageTransition = ({ children }: { children: any }) => (
  <div className="animate-fade-in-up transition-opacity duration-500 ease-in-out relative z-10">
    {children}
  </div>
);

export default PageTransition;
