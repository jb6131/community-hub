import { Link } from 'react-router-dom';

const NeedList = ({
  needs,
  title,
  showTitle = true,
  showFirstName = true,
}) => {
  if (!needs.length) {
    return <h3>No Community Needs Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {thoughts &&
        needs.map((need) => (
          <div key={need._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showFirstName ? (
                <Link
                  className="text-light"
                  to={`/profiles/${need.needAuthor}`}
                >
                  {need.needAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    posted this community project on {need.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You posted this community project on {need.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{need.needText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/needs/${need._id}`}
            >
              Participate in this community project.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default NeedList;