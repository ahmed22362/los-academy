import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props :any) => (
  <ContentLoader 
    speed={2}
    width={400}
    height={200}
    viewBox="0 0 400 150"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    {/* <rect x="25" y="15" rx="5" ry="5" width="220" height="15" /> 
    <rect x="25" y="49" rx="5" ry="5" width="220" height="15" /> 
    <rect x="25" y="83" rx="5" ry="5" width="220" height="15" /> 
    <rect x="25" y="111" rx="5" ry="5" width="220" height="15" /> 
    <rect x="27" y="140" rx="5" ry="5" width="220" height="15" />
    <rect x="25" y="83" rx="5" ry="5" width="220" height="15" /> 
    <rect x="25" y="111" rx="5" ry="5" width="220" height="15" /> 
    <rect x="27" y="140" rx="5" ry="5" width="220" height="15" /> */}
     <rect x="116" y="5" rx="3" ry="3" width="53" height="12" /> 
    <rect x="180" y="7" rx="3" ry="3" width="72" height="11" /> 
    <rect x="11" y="7" rx="3" ry="3" width="100" height="13" /> 
    <rect x="232" y="-10" rx="3" ry="3" width="152" height="10" /> 
    <rect x="117" y="31" rx="3" ry="3" width="53" height="12" /> 
    <rect x="177" y="31" rx="3" ry="3" width="72" height="11" /> 
    <rect x="8" y="31" rx="3" ry="3" width="100" height="13" /> 
    <rect x="122" y="58" rx="3" ry="3" width="53" height="12" /> 
    <rect x="182" y="58" rx="3" ry="3" width="72" height="11" /> 
    <rect x="13" y="58" rx="3" ry="3" width="100" height="13" /> 
    <rect x="120" y="85" rx="3" ry="3" width="53" height="11" /> 
    <rect x="180" y="85" rx="3" ry="3" width="72" height="10" /> 
    <rect x="11" y="85" rx="3" ry="3" width="100" height="13" />
  </ContentLoader>
)

export default MyLoader

