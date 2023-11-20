import { Button, Checkbox, Collapse, Modal, message } from "antd";
import { ReactNode, useCallback, useEffect, useState } from "react";
import pairwise from "../../../../dataset/pairwise.json";
import { remove, uniq } from "lodash";
import { useCreateListReducer } from "../../../../stores/CreateListReducer";
import { api } from "../../../../utils/api";
import { Icon } from "@iconify/react/dist/iconify.js";

interface SelectProjectPairwiseModalProps {
  isModalOpen: boolean;
  handleClose: () => void;
}

function SelectProjectPairwiseCheckbox({
  projectIds,
  value,
  children,
  onSelect,
  onUnselect,
  labelClickable = false,
}: {
  projectIds: string[];
  value: string[];
  children: ReactNode;
  onSelect: (projectIds: string[]) => any;
  onUnselect: (projectIds: string[]) => any;
  labelClickable?: boolean;
}) {
  let someSelected = false;
  let allSelected = true;

  for (const id of projectIds) {
    if (value.indexOf(id) == -1) {
      allSelected = false;
    } else {
      someSelected = true;
    }
  }

  // console.log(value)

  if (labelClickable) {
    return (
      <Checkbox
        checked={someSelected}
        indeterminate={someSelected && !allSelected}
        onChange={e => e.target.checked ? onSelect(projectIds) : onUnselect(projectIds)}
      >
        {children}
      </Checkbox>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        checked={someSelected}
        indeterminate={someSelected && !allSelected}
        onChange={e => e.target.checked ? onSelect(projectIds) : onUnselect(projectIds)}
      ></Checkbox>
      <div>{children}</div>
    </div>
  );
}

export const SelectProjectPairwiseModal = ({
  isModalOpen,
  handleClose,
}: SelectProjectPairwiseModalProps) => {
  const [state, dispatch] = useCreateListReducer();
  const [value, setValue] = useState<string[]>([]);

  useEffect(() => {
    setValue(state.listContent.map(x => x.RPGF3_Application_UID))
  }, [state, isModalOpen]);

  const onSelect = useCallback((projectIds: string[]) => {
    setValue(uniq([...value, ...projectIds]))
  }, [ value, setValue ])

  const onUnselect = useCallback((projectIds: string[]) => {
    setValue(remove([...value], x => projectIds.indexOf(x) == -1))
  }, [ value, setValue ])

  return (
    <Modal
      open={isModalOpen}
      footer={<></>}
      bodyStyle={{ padding: 0, height: "70vh", overflowY: "scroll" }}
      className="relative"
      onCancel={handleClose}
    >
      <h2 className="text-2xl">Select projects</h2>

      <p className="text-[#858796] mt-1">
        Using categorization from{" "}
        <a
          href="https://www.pairwise.vote/"
          target="_blank"
          className="underline"
        >
          Pairwise
        </a>
      </p>

      <p className="text-[#858796] mt-2 text-xs">
        Some modifications are applied to fix typos and missing projects
      </p>

      <div className="mt-3">
        <Collapse
          expandIconPosition="end"
          items={pairwise.map((collection) => ({
            key: collection.id,
            label: collection.name.trim(),
            children: (
              <Collapse
                expandIconPosition="end"
                items={collection.ranking.map((category) => ({
                  key: category.id,
                  label: (
                    <SelectProjectPairwiseCheckbox
                      projectIds={category.ranking.map((x) => x.RPGF3Id)}
                      value={value}
                      onSelect={projectIds => onSelect(projectIds)}
                      onUnselect={projectIds => onUnselect(projectIds)}
                    >
                      {category.name.trim()}
                    </SelectProjectPairwiseCheckbox>
                  ),
                  children: (
                    <div>
                      {category.ranking.map((project) => (
                        <div
                          key={project.id}
                          className="mb-1 flex items-center"
                        >
                          <SelectProjectPairwiseCheckbox
                            projectIds={[project.RPGF3Id]}
                            value={value}
                            onSelect={projectIds => onSelect(projectIds)}
                            onUnselect={projectIds => onUnselect(projectIds)}
                            labelClickable
                          >
                            {project.name.trim()}
                          </SelectProjectPairwiseCheckbox>
                          
                          <a href={"https://retrolist.app/project/" + project.RPGF3Id} target="_blank">
                            <Icon icon="lucide:external-link" />
                          </a>
                        </div>
                      ))}
                    </div>
                  ),
                }))}
              ></Collapse>
            ),
          }))}
        ></Collapse>
      </div>

      <div className="sticky bottom-0 bg-white pt-5 border-t border-t-gray-300">
        <div className="flex justify-between gap-2 w-full">
          <Button
            className="w-1/2 border border-[#FF04207D] text-[#FF0420] h-10"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            className="w-1/2 bg-[#FF0420] text-white h-10"
            htmlType="submit"
            onClick={async () => {
              try {
                const response = await api.post('/projects/byids', {
                  projectIds: value,
                })

                dispatch({
                  type: "updateProjects",
                  projects: response.data,
                })

                handleClose()
              } catch (err) {
                console.error(err)
                message.error('Cannot fetch projects information... Please try again')
              }
            }}
          >
            Select Projects
          </Button>
        </div>
      </div>
    </Modal>
  );
};
