import { useEffect, useRef, useState } from "react";
import List from "./components/List";
import Loader from "./components/Loader";
import SearchBar from "./components/SearchBar";
import { IPage, IRow } from "./types/page.type";

const apiUrl =
  import.meta.env.MODE === "production" ? "" : "http://localhost:3000";

function App() {
  const [page, setPage] = useState<number>(0);
  const [canLoad, setCanLoad] = useState<boolean>(true);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);
  const [listAddStatus, setListAddStatus] = useState<boolean>(false);
  const [search, setSearch] = useState<string | undefined>("");
  const [records, setRecords] = useState<IRow[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  const getPage = async (page: number): Promise<IPage> => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/list/${page}?q=${search}`);
      await new Promise((res) => setTimeout(() => res(1), 500));
      if (!response.ok) throw new Error(response.statusText);
      const payload = await response.json();
      return payload;
    } catch (e) {
      return { records: [], hasMore: false, total: 0 };
    } finally {
      setLoading(false);
    }
  };

  const replaceItem = async (
    fromId: number,
    toId: number
  ): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/list`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromId,
          toId,
        }),
      });
      if (!response.ok) throw new Error(response.statusText);
      return true;
    } catch (e) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const toggleCheck = async (id: number): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/list/check`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
        }),
      });
      if (!response.ok) throw new Error(response.statusText);
      return true;
    } catch (e) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const intersectHandler = () => {
    if (!listAddStatus) {
      setPage((page) => page + 1);
    }
  };

  const replaceHandler = (from: number, to: number) => {
    if (
      !(from < 0 || from >= records.length || to < 0 || to >= records.length)
    ) {
      replaceItem(records[from][0], records[to][0]).then((ok) => {
        if (ok) {
          const arrCopy = [...records];
          const [temp] = arrCopy.splice(from, 1);
          arrCopy.splice(to, 0, temp);
          return setRecords(arrCopy);
        }
      });
    }
  };

  const checkHeader = async (id: number) => {
    return toggleCheck(id);
  };

  const searchHandler = (query?: string) => {
    setSearch(query);
    setRecords([]);
    setCanLoad(true);
    setPage(1);
  };

  const updatePage = (page: number) => {
    setListAddStatus(true);
    getPage(page).then((page) => {
      setRecords((records) => [...records, ...page.records]);
      setCanLoad(page.hasMore);
      setTotal(page.total);
      setListAddStatus(false);
    });
  };

  useEffect(() => {
    if (page > 1) {
      updatePage(page);
    }
  }, [page]);

  useEffect(() => {
    updatePage(1);
    contentRef.current?.scrollTo(0, 0);
  }, [search]);

  return (
    <div className="main-layout">
      <div className="overlay" style={{ display: isLoading ? "flex" : "none" }}>
        <span className="spinner"></span>
      </div>
      <div className="main-header">
        <SearchBar onSearch={searchHandler} />
      </div>
      <div className="main-content" ref={contentRef}>
        {total ? (
          <div className="table-wrapper">
            <List
              records={records}
              onDragAndDrop={replaceHandler}
              onCheck={checkHeader}
            />
          </div>
        ) : (
          <div>Not found</div>
        )}
        {canLoad && (
          <Loader
            scrollRef={contentRef}
            onIntersect={intersectHandler}
            status={listAddStatus}
          />
        )}
      </div>
      <div className="main-footer">{`Всего записей: ${total}`}</div>
    </div>
  );
}

export default App;
