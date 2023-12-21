import { observer } from "mobx-react-lite";
import { Food } from "../../models/Food";
import { SearchResult } from "./SearchResult";

interface Props {
    results: Food[];
    onSelectResult: (selectedResult: Food) => void;
}


export const SearchResultsList = observer(({ results, onSelectResult }: Props) => {
    return (
      <div className="results-list">
        {results.map((result, id) => {
          return <SearchResult result={result} key={id} onSelect={onSelectResult }  />;
        })}
      </div>
    );
  });