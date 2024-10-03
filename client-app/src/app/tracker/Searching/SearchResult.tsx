import { observer } from "mobx-react-lite";
import { Food } from "../../models/Food";

interface Props {
    result: Food;
    onSelect: (selectedResult: Food) => void;
}

export const SearchResult = observer(({ result, onSelect }: Props) => {

    const handleSelect = () => {
      onSelect(result);
    };

    return (
      <div
        className="search-result"
        onClick={handleSelect}
      >
        {result.name },   has {result.calories} calories per 100 grams
      </div>
    );
  });