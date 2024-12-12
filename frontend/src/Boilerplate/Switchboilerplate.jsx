



const Switchboilerplate = ({text}) => {
    return (
        <>
            <div className="col-xxl-6 col-xl-6 col-lg-12 col-sm-12 col-xs-12">
                <label className="form-label">{text}</label>

            </div>
            <div className="d-flex justify-content-end col-xxl-6 col-xl-6 col-lg-12 col-sm-12 col-xs-12">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />

                </div>

            </div>

        </>
    );
}


export default Switchboilerplate;