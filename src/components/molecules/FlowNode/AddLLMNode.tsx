import { useCallback, useContext, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'src/lib/shadcn/ui/card'
import { Button } from 'src/lib/shadcn/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/lib/shadcn/ui/select'
import { SUPPORTED_LLMS } from 'src/constants/llms'
import { useCreateDatabaseLLM } from 'src/hooks/use-create-database-llm'
import { LLMDatabaseContext } from 'src/contexts/LLMDatabase/context'

function AddLLMNode() {
  const { reload } = useContext(LLMDatabaseContext)
  const { createDatabaseLLM } = useCreateDatabaseLLM()
  const [input, setInput] = useState('')

  const handleOnchange = useCallback((value: string) => {
    setInput(value)
  }, [])
  const hanldeSubmit = async () => {
    console.log(input)
    await createDatabaseLLM(input)
    return reload()
  }
  return (
    <div>
      <Card className="tw-w-[350px]">
        <CardHeader>
          <CardTitle>Add LLM</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="tw-grid tw-w-full tw-gap-1.5">
            <Select onValueChange={handleOnchange}>
              <SelectTrigger className="tw-w-full">
                <SelectValue placeholder="Model name" />
              </SelectTrigger>
              <SelectContent>
                {SUPPORTED_LLMS.map(item => {
                  return (<SelectItem key={item} value={item}>{item}</SelectItem>)
                })}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="tw-flex tw-justify-between">
          <Button onClick={hanldeSubmit} disabled={!input} className="tw-w-full">
            Send
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default AddLLMNode
