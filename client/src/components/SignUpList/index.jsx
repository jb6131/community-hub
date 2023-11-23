const SignUpForNeedList = ( { signedUpUsers = [] } ) => {
    if (!signedUpUsers.length) {
      return <h3>Nobody Signed Up Yet</h3>;
    }
  
    return (
      <>
        <h3
          className="p-5 display-inline-block"
          style={{ borderBottom: '1px dotted #1a1a1a' }}
        >
          Signed Up Users
        </h3>
        <div className="flex-row my-4">
          {signedUpUsers.map((user) => (
            <div key={user._id} className="col-12 mb-3 pb-3">
              <div className="p-3 bg-dark text-light">
                <h5 className="card-header">
                  {user.firstName} {user.lastName}
                  <span style={{ fontSize: '0.825rem' }}>
                    {/* You can add more user details here */}
                  </span>
                </h5>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };
  
  export default SignUpForNeedList;
  