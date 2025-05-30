export const asyncHandler = (API) => {
    return (req, res, next) => {
      API(req, res, next).catch(async (err) => {
        return next(new Error("Fail", { cause: 500 }));
      });
    };
  };
  
  export const globalResponse = (err, req, res, next) => {
    // if (req.validationErrorArr) {
    //   return res.status(400).json({ message: req.validationErrorArr });
    // }
    if (err) {
      return res.status(err["cause"] || 500).json({ message: err.message });
    }
  };