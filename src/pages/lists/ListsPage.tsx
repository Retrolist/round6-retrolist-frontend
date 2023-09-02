import React from "react"
import Layout from "../../components/Layout"
import LayoutSideInfo from "../../components/LayoutSideInfo"
import { LOREM } from "../../utils/lorem"

export default function ListsPage() {
  return (
    <Layout>
      <LayoutSideInfo>
        <div>
          <div className="mb-3">
            <div className="text-2xl font-bold">Lists</div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div className="rounded-2xl border border-gray-300 p-4 w-full transition hover:cursor-pointer hover:border-gray-400">
                <div className="text-lg mb-1 font-bold">List {i}</div>

                <div className="flex mb-3">
                  <div className="rounded-full bg-gray-300 mr-2" style={{ width: 20, height: 20 }}></div>
                  <div className="font-bold text-sm">chomtana.eth</div>
                </div>

                <div className="text-gray-600 line-clamp-2 text-sm mb-3">
                  {LOREM}
                </div>

                <div className="flex flex-wrap">
                  <div className="rounded bg-gray-300 text-gray-600 px-2 py-1 text-xs mr-2 mb-2">
                    Collective Governance
                  </div>

                  <div className="rounded bg-gray-300 text-gray-600 px-2 py-1 text-xs mr-2 mb-2">
                    OP Stack
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </LayoutSideInfo>
    </Layout>
  )
}

export const ListsPageRoute =   {
  path: "/",
  element: <ListsPage />,
}