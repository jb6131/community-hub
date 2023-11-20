const SignUpForNeedList = ({ signUpForNeed = [] }) => {
    if (!signUpForNeed.length) {
      return <h3>Nobody Signed Up Yet</h3>;
    }
  
    return (
      <>
        <h3
          className="p-5 display-inline-block"
          style={{ borderBottom: '1px dotted #1a1a1a' }}
        >
          SignedUp
        </h3>
        <div className="flex-row my-4">
          {comments &&
            signUpForNeed.map((signUpForNeed) => (
              <div key={signUpForNeed._id} className="col-12 mb-3 pb-3">
                <div className="p-3 bg-dark text-light">
                  <h5 className="card-header">
                    {signUpForNeed.signUpForNeedAuthor} signedup{' '}
                    <span style={{ fontSize: '0.825rem' }}>
                      on {signUpForNeed.createdAt}
                    </span>
                  </h5>
                  <p className="card-body">{signUpForNeed.signUpForNeedText}</p>
                </div>
              </div>
            ))}
        </div>
      </>
    );
  };
  
  export default SignUpForNeedList;
  