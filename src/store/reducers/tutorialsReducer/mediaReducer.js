import * as actions from "../../actions/actionTypes";

const initialState = {
  uploading: false,
  uploading_error: null,
  deleting: false,
  deleting_error: null
};

const mediaReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.CLEAR_TUTORIAL_MEDIA_STATE:
      return initialState;
    case actions.TUTORIAL_MEDIA_UPLOAD_START:
      return { ...state, uploading: true, uploading_error: null };
    case actions.TUTORIAL_MEDIA_UPLOAD_SUCCESS:
      return { ...state, uploading: false, uploading_error: false };
    case actions.TUTORIAL_MEDIA_UPLOAD_FAIL:
      return { ...state, uploading: false, uploading_error: payload };
    case actions.TUTORIAL_MEDIA_DELETE_START:
      return { ...state, deleting: true, deleting_error: null };
    case actions.TUTORIAL_MEDIA_DELETE_SUCCESS:
      return { ...state, deleting: false, deleting_error: false };
    case actions.TUTORIAL_MEDIA_DELETE_FAIL:
      return { ...state, deleting: false, deleting_error: payload };
    default:
      return state;
  }
};

export default mediaReducer;
