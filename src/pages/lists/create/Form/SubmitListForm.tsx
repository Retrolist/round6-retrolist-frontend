import { Form } from "antd";
import { useNavigate } from "react-router-dom";
import { useCreateListReducer } from "../../../../stores/CreateListReducer";

export const SubmitListForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [state, dispatch] = useCreateListReducer();
  return (
    <div className="p-6 bg-white rounded-lg border border-[#EAECF0]">
      <div className="flex gap-3">
        <div className="w-3/4">
          <div className="text-lg">OP Good List A</div>
          <p className="text-[#858796]">
            I believe that the various projects in these lists are quite
            community-oriented. I've selected only 3-4 projects that seem
            feasible and have already made some progress. If they receive
            support from OP, I think they will bring a lot of good things to us.
          </p>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export const SubmitListFormRoute = {
  path: "/lists/create/submit-list",
  element: <SubmitListForm />,
};
