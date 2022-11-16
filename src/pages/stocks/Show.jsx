import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import Skeleton from 'react-loading-skeleton'

import { useTodos } from '@/contexts/Todos'

function PagesTodosShow() {
  const { id } = useParams()
  const { show: { data: todo, loading }, getTodo } = useTodos()

  useEffect(() => {
    getTodo(id)
  }, [])

  if (!loading && !todo) return <h1 className="text-center">Todo {id} Not Found</h1>

  return (
    <div id="pages-todos-show" className="container">
      <div className="text-center">
        <h1>{todo?.id ? `Todo ${todo.id}` : <Skeleton className="w-50" />}</h1>
        <h2>{todo?.title || <Skeleton className="w-50" />}</h2>
        <h3>{todo?.createdAt ? moment(todo.createdAt).format('YYYY/MM/DD') : <Skeleton className="w-50" />}</h3>
      </div>

      {
        (todo?.TodoItems?.length > 0 || loading) && (
          <div className="row">
            <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
              <ul className="list-group text-center">
                {
                  loading ? (
                    Array(5).fill(null).map((temp, i) => (
                      <li key={i} className="list-group-item">
                        <Skeleton />
                      </li>
                    ))
                  ) : (
                    todo.TodoItems.map((item) => (
                      <li key={item.id} className="list-group-item">
                        <span className={`${item.checked && 'text-secondary'}`}>{item.name}</span>
                      </li>
                    ))
                  )
                }
              </ul>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default PagesTodosShow
