import ContentLoader from "react-content-loader";

const SkeletonButtons = (props: object) => (
  <ContentLoader speed={2} width={69} height={31} viewBox="0 0 69 31" backgroundColor="#762727" foregroundColor="#2c0202" {...props}>
    <rect x="0" y="0" rx="15" ry="15" width="69" height="31" />
    
  </ContentLoader>
);
export default SkeletonButtons;
