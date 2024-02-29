function getStatsFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      const numbers = event.target.result.split('\n').map(Number);
      const longestIncreasingSequence = getLongestIncreasingSequence(numbers);
      const longestDecreasingSequence = getLongestDecreasingSequence(numbers);
      const median = getMedian(numbers);
      const maxValue = getMax(numbers);
      const minValue = getMin(numbers);
      const mean = getMean(numbers);

      resolve({
        longestIncreasingSequence,
        longestDecreasingSequence,
        median,
        maxValue,
        minValue,
        mean
      });
    };

    reader.onerror = function (event) {
      reject(event.target.error);
    };

    reader.readAsText(file);
  });
}

function getMax(numbers) {
  let max = -Infinity;

  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > max) {
      max = numbers[i];
    }
  }

  return max;
}

function getMin(numbers) {
  let min = Infinity;

  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] < min) {
      min = numbers[i];
    }
  }

  return min;
}

function getMean(numbers) {
  return numbers.reduce((a, b) => a + b, 0) / numbers.length;
}


function getLongestIncreasingSequence(numbers) {
  let longestSequence = [];
  let currentSequence = [];

  for (let i = 0; i < numbers.length; i++) {
    if (currentSequence.length === 0 || numbers[i] > currentSequence[currentSequence.length - 1]) {
      currentSequence.push(numbers[i]);
    } else {
      if (currentSequence.length > longestSequence.length) {
        longestSequence = currentSequence;
      }
      currentSequence = [numbers[i]];
    }
  }

  if (currentSequence.length > longestSequence.length) {
    longestSequence = currentSequence;
  }

  return longestSequence.join(', ');
}

function getLongestDecreasingSequence(numbers) {
  let longestSequence = [];
  let currentSequence = [];

  for (let i = 0; i < numbers.length; i++) {
    if (currentSequence.length === 0 || numbers[i] < currentSequence[currentSequence.length - 1]) {
      currentSequence.push(numbers[i]);
    } else {
      if (currentSequence.length > longestSequence.length) {
        longestSequence = currentSequence;
      }
      currentSequence = [numbers[i]];
    }
  }

  if (currentSequence.length > longestSequence.length) {
    longestSequence = currentSequence;
  }

  return longestSequence.join(', ');
}

function getMedian(numbers) {
  numbers.sort((a, b) => a - b);

  const middle = Math.floor(numbers.length / 2);

  if (numbers.length % 2 === 0) {
    return Math.round((numbers[middle - 1] + numbers[middle]) / 2);
  } else {
    return Math.round(numbers[middle]);
  }
}

export default getStatsFromFile;