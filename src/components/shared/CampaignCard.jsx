import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { Tooltip } from 'react-tooltip';

const CampaignCard = ({ campaign }) => {
    const { _id, title, image, description, minimumDonation, deadline } = campaign;

    return (
        <Fade direction="up" triggerOnce>
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                <figure>
                    <img src={image} alt={title} className="h-48 w-full object-cover" />
                </figure>
                <div className="card-body bg-base-100">
                    <h2 
                        className="card-title cursor-help"
                        data-tooltip-id={`title-${_id}`}
                        data-tooltip-content={title}
                    >
                        {title}
                    </h2>
                    <Tooltip id={`title-${_id}`} />

                    <p className="text-base-content/70">{description.slice(0, 100)}...</p>
                    <div className="flex justify-between items-center mt-4">
                        <div>
                            <p 
                                className="text-sm text-base-content/60 cursor-help"
                                data-tooltip-id={`donation-${_id}`}
                                data-tooltip-content="Minimum amount required to donate"
                            >
                                Minimum Donation
                            </p>
                            <Tooltip id={`donation-${_id}`} />
                            <p className="font-bold text-primary">${minimumDonation}</p>
                        </div>
                        <div>
                            <p 
                                className="text-sm text-base-content/60 cursor-help"
                                data-tooltip-id={`deadline-${_id}`}
                                data-tooltip-content="Campaign end date"
                            >
                                Deadline
                            </p>
                            <Tooltip id={`deadline-${_id}`} />
                            <p className="font-bold">{new Date(deadline).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className="card-actions justify-end mt-4">
                        <Link 
                            to={`/campaign/${_id}`} 
                            className="btn btn-primary"
                            data-tooltip-id={`view-${_id}`}
                            data-tooltip-content="View campaign details"
                        >
                            See More
                        </Link>
                        <Tooltip id={`view-${_id}`} />
                    </div>
                </div>
            </div>
        </Fade>
    );
};

export default CampaignCard; 