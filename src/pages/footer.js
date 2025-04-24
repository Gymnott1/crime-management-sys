import React from 'react';
// You can import the CSS from index.css or create a specific footer.css
// import './footer.css';

function FooTer() {
  return (
    <footer>
      <div className="student-project">
         Student Project Demonstration
      </div>
      <div className="copyright">
        © {new Date().getFullYear()} Your App Name. All Rights Reserved.
      </div>
    </footer>
  );
}

export default FooTer;